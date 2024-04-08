import { DNA } from 'react-loader-spinner';


export default function Loading() {
    return (
      <div className='flex items-center justify-center w-full'>
       <DNA
  visible={true}
  height="50"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
      </div>
    )
  }