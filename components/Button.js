export default function Button({ children }) {
  return (
    <button className={`
    transition 
    bg-teal-700 
    hover:bg-teal-800 
    text-white 
    font-bold 
    py-2 px-4 
    rounded-md
    
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-emerald-500/50
    `}>
      {children}
    </button>
  )
}