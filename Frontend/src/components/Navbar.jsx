import { useState } from "react"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"


const Navbar = () => {

    const todayDate =  Date.now();
    const [date, setDate] = useState(todayDate);

  return (
    <>
        <h2 className="text-red-400">navbar here </h2>
        <Button varient="primary">Login</Button>

        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    </>
  )
}

export default Navbar