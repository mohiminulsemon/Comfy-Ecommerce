import axios from "axios";
import { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    useEffect(() => {
        axios.get("/products.json")
            .then(res => setAllProducts(res.data))
            .catch(err => console.log(err));
           
    }, []); 
    useEffect(() => {
        AOS.init({
            duration: 1500,
            offset: 100,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const generateStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500 inline" />);
        }
        return stars;
    };

    const handleAddToCart = (product) => {
        const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductInCart = existingCartItems.some(item => item.id === product.id);

        if (isProductInCart) {
            // If product is already in cart, show SweetAlert
            Swal.fire({
                title: 'Product is already in the cart!',
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            // If product is not in cart, add it to cart
            const updatedCartItems = [...existingCartItems, product];
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
            Swal.fire({
                title: 'Added to cart!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/carts');
        }
    };
    return (
        <div className="py-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 m-10 md:m-14 lg:m-16">
                {allProducts.map((product, index) => (
                    <div key={product.id} data-aos={index % 2 === 0 ? 'fade-up' : 'fade-down'}>
                        
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={product.img} className="w-full h-96 md:h-64 lg:h-full lg:object-center" alt="Product" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <div className="flex justify-between   gap-28 ">
                                <p className="text-cyan-900 font-bold "> <span className="text-black">{product.seller}</span></p>
                                <p className="text-right">{product.category}</p>
                                </div>
                                <div className="flex justify-between items-center gap-32">
                                    
                                     <p>Price: <span className="text-red-600">{product.price}$</span></p>
                                     <p className="text-right">{generateStars(product.ratings)}</p> 
                                </div>
                               
                               
                                <div className="card-actions">
                                    <div className="flex justify-between gap-24 items-center ">
                                        
                                    {
                                        isLoggedIn ?
                                        <button className="bg-cyan-700 text-white py-2 px-4 rounded" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                        :
                                        <button className="bg-cyan-700 text-white py-2 px-4 rounded" onClick={() => navigate('/login')}>Login to Add to Cart</button>
                                        
                                    }

                                    <Link to={`/allProducts/${product.id}`}><button className="bg-violet-500 text-white py-2 px-3 rounded ">View Details</button></Link>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
