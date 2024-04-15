
export default function TextInputBox({placeholder, onChangFunc, value, required}) {


  return (
    <input
      type="text"
      className="rounded-md px-4 w-full py-2 my-2 border border-slate-300 "
      placeholder= {placeholder}
      onChange={onChangFunc}
      value={value}
      required = {required}
    />
  )
}