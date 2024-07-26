import CardComp from "../Components/Card"
import { GrOverview } from "react-icons/gr";
import { MdCalendarMonth } from "react-icons/md";
import { GiExpense } from "react-icons/gi";
import { FaCodeCompare } from "react-icons/fa6";
import RecentTransaction from "../Components/RecentTransaction";
import BudgetAlert from "../Components/BudgetAlert";
import UpComingBills from "../Components/UpComingBills";



export default function Dashboard(){
    return(
        <div className="h-screen bg-[#0F0F0F] py-8 flex flex-col justify-between">
            <div className="w-full px-4 bg-[#0F0F0F] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center py-6">
                <CardComp Props={GrOverview} cardTitle="Overview"/>
                <CardComp Props={MdCalendarMonth} cardTitle="Monthly Overview"/>
                <CardComp Props={GiExpense} cardTitle="Expense Categories"/>
                <CardComp Props={FaCodeCompare} cardTitle="Income vs Expense"/>
                
             </div>
             <div className=" bg-[#0F0F0F] flex justify-around flex-wrap">
                <RecentTransaction/>
                <BudgetAlert/>
                <UpComingBills/>
             </div>
         </div>
    )
}