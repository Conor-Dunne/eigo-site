
export default function TextInputBox({placeholder, onChangFunc}) {


  return (
    <input
      type="text"
      className="rounded-md px-4 w-full py-2 my-2 border border-slate-300 "
      placeholder= {placeholder}
      onChange={onChangFunc}
    />
  )
}