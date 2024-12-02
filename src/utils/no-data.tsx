import cross from '../assets/cross-white.svg'
function NoData() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <h5 className="text-slate-50 bg-red-500 px-4 py-1 rounded-lg font-bold flex justify-center items-center ">
        <span>
          <img src={cross} className="w-[30px] me-2" alt="cross" />
        </span>
        <span>No Data Found!</span>
      </h5>
    </div>
  );
}

export default NoData