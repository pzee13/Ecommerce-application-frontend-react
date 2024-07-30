
import { Link } from 'react-router-dom';
import HomeImage from '../assets/Images/homeimage.png';
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="relative pt-14  bg-black">
        <div className="absolute inset-x-0 top-0 z-10">
        <div className="relative py-4 bg-white">
            <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                <div className="md:flex md:items-center md:justify-between">
                    <p className="font-sans text-4xl font-extrabold tracking-tight text-black">Are You Admin ?</p>

                    <div className="flex items-center justify-start mt-4 space-x-3 md:mt-0 md:justify-end sm:space-x-4">
                        <Link
                            to="/admin"
                            title=""
                            className="
                                inline-flex
                                items-center
                                justify-center
                                px-5
                                py-2
                                font-sans
                                text-base
                                font-semibold
                                leading-6
                                transition-all
                                duration-200
                                border-2 border-transparent
                                rounded-full
                                sm:leading-8
                                bg-black
                                text-white
                                sm:text-lg
                                hover:bg-opacity-90
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-primary
                            "
                            role="button"
                        >
                            To Admin
                        </Link>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
            <div className="relative">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <div className="grid items-center grid-cols-1 lg:grid-cols-2">
                    <div>
                        <h1 className="font-sans text-base font-normal tracking-tight text-white text-opacity-70">Discover the Latest Trends in Electronics and Fashion</h1>
                        <p className="mt-6 tracking-tighter text-white">
                            <span className="font-sans font-normal text-7xl">Unleash Your Style</span><br />
                            <span className="font-serif italic font-normal text-8xl">and Tech </span>
                        </p>
                        <p className="mt-12 font-sans text-base font-normal leading-7 text-white text-opacity-70">Explore our wide range of products from cutting-edge electronics to trendy apparel. Find everything you need to stay ahead in style and technology. Shop now and enjoy unbeatable deals!</p>
                    </div>

                    <div className="hidden lg:block">
                        <img className="w-full mx-auto" src={HomeImage} alt="Featured Products" />
                    </div>
            </div>
        </div>
    </div>

   
</div>
      
    </div>
  );
};

export default Home;
