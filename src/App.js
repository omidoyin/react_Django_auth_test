
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


// GLOBAL VARIBLES for axios......................................................................................

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = false;

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

// axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
// axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
// axios.defaults.withCredentials =true;
axios.defaults.headers.common['content-type'] = 'application/json'
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

const client = axios.create({baseURL:"https://markethubapi.vercel.app"});
const headers = {'content-type':'application/json'}

// url to get products
const API_URL = 'https://markethubapi.vercel.app/api/products'



function App() {
  // states
const[signedIn, setSignedIn] = useState(false);
// set form states
const[registerForm, setRegisterForm] = useState(false);
const[signedInForm, setSignedInForm] = useState(false);
const[producstform, setproducstform] = useState(false);
// login details
const[username, setUsername] = useState("");
const[email, setEmail] = useState("");
const[password, setPassword] = useState("");
// product details
const[productName, setProductName] = useState("");
const[productType, setProductType] = useState("");
const[productPrice, setProductPrice] = useState("");
const[productDesc, setProductDesc] = useState("");
// store products from backend
const[products, setProducts] = useState([]);



// get and check if user is still logged in by using session id ...........................................................


const[currentUser, setCurrentUser] = useState();

const getUserAuth = async ()=>{
  client.get("/api/users/profile").then((res)=>{
    setCurrentUser(true)
    // console.log(res)
    console.log(currentUser)
})
.catch((error)=>{
    setCurrentUser(false);
    console.log(currentUser)
    console.error(error)
})


}
// .............................................................................................




// functions...................................................
const handleSignIn = ()=>{
  //  call the api
  client.post("/api/users/login", {username, password, email} ).then((response)=>{
      console.log(response)
      getUserAuth()
          })
     
   // if succesful
  //  setSignedIn(true)
   setSignedInForm(false)
}
const handleRegister = ()=>{
  //  call the api

  // if succesful
  //  setSignedIn(true)
  setRegisterForm(false)
}
const handleLogOut = ()=>{
  //  call the api
}
const handlePostProducts = ()=>{
  //  call the api

   // if succesful
   setproducstform(false)
}
const getProducts = async(product)=>{
  const {data} = await axios.get(`${API_URL}`, {headers})
  // const {data} = await axios.get("/api/products")
  setProducts(data);
  }
  
  // useEffect to get the products on render..........................................
  useEffect(() =>{ 
    getProducts('products');

},[]);



  return (
    <div className="App">
      {/* navbar....................................................... */}
      <section className="navbar">
        {
          signedIn?(<button onClick={handleLogOut}> LogOut</button>):
          (<button onClick={()=>{
            setSignedInForm(prev=>!prev)
            setRegisterForm(false)
          }}>Sign In </button>)
        }
        {
          signedIn?(<button onClick={()=>setproducstform(prev=>!prev)}> Post Products</button>):
          (<button 
            onClick={()=>{
              setRegisterForm(prev=>!prev)
              setSignedInForm(false)
            
            }}> Register</button>)
        }
      </section>

      {/* forms ...................................................... */}
      <section className="forms">
       { signedInForm && (<div className="signinform">
         <form >
            <input type="text" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="text" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleSignIn}> SignIn</button>
          </form>
        </div>)
     } 
       { registerForm && (<div className="registerform">
         <form >
            <input type="text" placeholder='username' onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="text" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleRegister}> Register</button>
          </form>
        </div>)
     } 
       { producstform && (<div className="productform">
         <form >
            <input type="text" placeholder='product name' onChange={(e)=>{setProductName(e.target.value)}} />
            <input type="number" placeholder='product price' onChange={(e)=>{setProductPrice(e.target.value)}} />
            <input type="text" placeholder='product type' onChange={(e)=>{setProductType(e.target.value)}} />
            <input type="text" placeholder='product description' onChange={(e)=>{setProductDesc(e.target.value)}}/>
            <button onClick={handlePostProducts}> Post</button>
          </form>
        </div>)
     } 
      </section>

      {/* hero..................................................... */}
      <section className="welcome">
        <h1>Hello Welcome to my Shop</h1>
      </section>
      {/* products display............................................ */}
      <section className="display">
        <h1>NEW PODUCTS</h1>
        <div className="Products">
          {
            products?.map((item)=>(
              <div className='items'>
                <img src={item.product_image} alt=""  />
                  <h1>{item.product_name}</h1>
                  <h1>{item.product_price}</h1>
              </div>
            ))
          }

        </div>
      </section>
      
    </div>
  );
}

export default App;
