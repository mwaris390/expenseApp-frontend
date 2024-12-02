import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { setUser, setVerified } from "../hooks/slices/userSlice";
import { VerifyKey } from "../apis/verify";
import { UpdateVerifyKey } from "../apis/updateVerifyKey";

function Verify({ userId }: { userId: string }) {
  const dispatch = useDispatch();
  const verifySchema = z.object({
    key: z
      .string()
      .min(4, "Key must be 4 digit long")
      .max(4, "Key must be 4 digit long"),
  });
  type verifySchemaType = z.infer<typeof verifySchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<verifySchemaType>({
    mode: "onChange",
    resolver: zodResolver(verifySchema),
  });
  const sentVerification = async (data: any) => {
    Object.assign(data, { userId });
    let res = await VerifyKey(data);
    if (res) {
      dispatch(setVerified({ isVerified: true }));
    }
  };
  const generateNewKey = async () => {
    await UpdateVerifyKey({ userId });
  };
  return (
    <div className="border h-[75vh] flex justify-center items-center">
      <div className="bg-white p-4 w-2/3 shadow rounded-lg">
        <h6 className="border-b-2 border-black mb-2 pb-2">
          Verify Your Identity
        </h6>
        <form onSubmit={handleSubmit(sentVerification)}>
          <div className="flex flex-col">
            <label htmlFor="key">Verification Key</label>
            <input
              type="text"
              placeholder="Write Key Here"
              id="key"
              {...register("key")}
            />
            {errors.key && (
              <p className="error-message">{errors.key.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-secondary text-white font-bold px-4 py-2 rounded flex justify-between items-center"
              type="button"
              onClick={generateNewKey}
            >
              Generate New
            </button>
            <button
              className="bg-accent text-white font-bold px-4 py-2 rounded flex justify-between items-center"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;
