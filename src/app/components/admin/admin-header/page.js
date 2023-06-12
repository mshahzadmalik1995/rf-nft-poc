import { RxAvatar } from 'react-icons/rx'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillDatabaseFill } from 'react-icons/bs'
const AdminHeader = () => {
    return (
        <div className="flex flex-col  h-60 p-2 mt-2">
            <div className="relative  h-60 p-3"><br></br>
                <h1 className="relative z-10 text-lg text-center font-bold italic text-red-500 ">Royal Enfield</h1>
                <div className="absolute inset-0  h-64 lg:rounded-lg sm:rounded-br-3xl">
                    <img
                        src="/RE1.jpg"
                        alt="background image"
                        className="w-screen h-64 object-cover lg:rounded-lg sm:rounded-br-3xl"
                    />
                </div>
            </div>
        </div >
    )
}

export default AdminHeader;