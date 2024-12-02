import loader from '../assets/loader.svg'
export function Spinner(){
    return (
        <img src={loader} alt="spinner" className='animate-spin w-[20px] mx-1' />
    )
}