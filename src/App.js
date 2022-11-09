import React from "react";
import './style/reset.css'
import './style/app.css';
import FormComponent from "./components/FormComponent.js";
 
class App extends React.Component {
  
  render() {
    return (
      <section className="form-section">
        <div className="container">
          <h1 className="text-center">Formulario de registro</h1>
          <p className="h2 text-center">Introduce tus datos por favor:</p>
          
          <FormComponent ></FormComponent>
    
        </div>
        <p className="text-center disclaimer-txt">Néstor Guadalupe García Ortega</p>
      </section>
    )
  }
} 

export default App;