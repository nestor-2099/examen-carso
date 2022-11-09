import React from "react";

import {db} from '../firebase'
import {collection, addDoc, updateDoc, Timestamp, query, doc, where, getDocs} from 'firebase/firestore'

class FormComponent extends React.Component {
  constructor() {
    super();
    
    this.state = {
      collectionId: '',
      userId : 1,
      userName: '',
      isUserName: '',
      userEmail: '',
      isUserEmail: '',
      isValidEmail: false,
      userAge: '',
      isUserAge: '',
      userGenre: 'Mujer',
      countries: [],
      userCountry: 0,
      isUserCountry: '',
      userState: 0,
      isUserState: '',
      userAddress: '',
      isUserAddress: '',
      active: true,
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.saveUser = this.saveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.renderUsers = this.renderUsers.bind(this);
  }

  // Cambio sobre los inputs del formulario
  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }

  // Cambio sobre el Select de País para resetear el estado a nulo
  handleCountryChange(e) {
    this.setState({ [e.target.name] : e.target.value });
    this.setState({
      userState: ''
    })
  }

  // Validación de correo electrónico
  validateEmail(e) {
    let email = e.target.value;

    let expr = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    //let expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!expr.test(email)) {
      this.setState({
        isValidEmail: false
      });
      return false;
    }
    this.setState({
      isValidEmail: true
    });
  }


  // Guardar usuario en base de datos (Firebase)
  async saveUser() {
    if(this.state.userName === '') {
      this.setState({ isUserName: "error" });
    } else {
      this.setState({ isUserName: '' });
    }

    if(this.state.userEmail === '' || this.state.isValidEmail === false) {
      this.setState({ isUserEmail: "error" });
    } else {
      this.setState({ isUserEmail: '' });
    }

    if(this.state.userAge === '') {
      this.setState({ isUserAge: "error" });
    } else {
      this.setState({ isUserAge: '' });
    }

    if(this.state.userCountry === '') {
      this.setState({ isUserCountry: "error" });
    } else {
      this.setState({ isUserCountry: '' });
    }

    if(this.state.userState === '') {
      this.setState({ isUserState: "error" });
    } else {
      this.setState({ isUserState: '' });
    }

    if(this.state.userAddress === '') {
      this.setState({ isUserAddress: "error" });
    } else {
      this.setState({ isUserAddress: '' });
    }

    if (this.state.userName === '' || this.state.userEmail === '' || this.state.isValidEmail === false || this.state.userAge === '' || this.state.userCountry === '' || this.state.userState === '' || this.state.userAddress === '') {
      return false;
    }


    let items = this.state.items,
        updateUser = false;

    for(let i = 0; i < items.length; i++) {
      if(items[i].userEmail === this.state.userEmail) {
        updateUser = true;
      }
    }


    if(updateUser === true) {
      this.updateUser(this.state.userEmail);
    } else {
      
      /*
      let items = this.state.items;

      items.push({
        userId: this.state.userId,
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userAge: this.state.userAge,
        userGenre: this.state.userGenre,
        userCountry: this.state.userCountry,
        userState: this.state.userState,
        userAddress: this.state.userAddress,
        active: this.state.active
      });
      */



      try {
        await addDoc(collection(db, 'users'), {
          userId: this.state.userId,
          userName: this.state.userName,
          userEmail: this.state.userEmail,
          userAge: this.state.userAge,
          userGenre: this.state.userGenre,
          userCountry: this.state.userCountry,
          userState: this.state.userState,
          userAddress: this.state.userAddress,
          active: true,
          created_at: Timestamp.now(),
          updated_at: Timestamp.now()
        })
      } catch (err) {
        alert(err)
      }

      this.setState({
        collectionId: '',
        userId: this.state.userId + 1,
        userName: '',
        userEmail: '',
        userAge: '',
        userGenre: 'Mujer',
        userCountry: '',
        userState: '',
        userAddress: '',
        active: true,
        isValidEmail: true
      });

      this.getUsers()

      document.getElementById('registered-users').scrollIntoView()
      alert("Registro creado correctamente");
    }
  }

  // Borrado de usuario en base de datos (Firebase)
  async deleteUser(e) {
    let userEmail = e.target.value;
    let items = this.state.items;

    for(let i = 0; i < items.length; i++) {
      
      if(items[i].userEmail === userEmail) {
        
        try {
          await updateDoc(doc(db, 'users', items[i].collectionId), {
            userId: 1,
            userName: items[i].userName,
            userEmail: items[i].userEmail,
            userAge: items[i].userAge,
            userGenre: items[i].userGenre,
            userCountry: items[i].userCountry,
            userState: items[i].userState,
            userAddress: items[i].userAddress,
            active: false,
            updated_at: Timestamp.now()
          })
        } catch (err) {
          alert(err)
        }

  
        this.setState({
          items: items,
          userName: '',
          userEmail: '',
          userAge: '',
          userGenre: 'Mujer',
          userCountry: '',
          userState: '',
          userAddress: '',
          active: true,
          isValidEmail: true
        });
  
        this.getUsers()

        document.getElementById('registered-users').scrollIntoView()
        alert("Registro borrado correctamente");
        break;
      }
    }

  }

  // Actualización de usuario en base de datos (Firebase)
  async updateUser(email) {
    let userEmail = email;
    
    let items = this.state.items;

    for(let i = 0; i < items.length; i++) {
      
      if(items[i].userEmail === userEmail) {
        items[i].userName = this.state.userName;
        items[i].userEmail = this.state.userEmail;

        items[i].userAge = this.state.userAge;
        items[i].userGenre = this.state.userGenre;
        items[i].userCountry = this.state.userCountry;
        items[i].userState = this.state.userState;
        items[i].userAddress = this.state.userAddress;
        items[i].active = true;

        try {
          await updateDoc(doc(db, 'users', items[i].collectionId), {
            userId: this.state.userId,
            userName: this.state.userName,
            userEmail: this.state.userEmail,
            userAge: this.state.userAge,
            userGenre: this.state.userGenre,
            userCountry: this.state.userCountry,
            userState: this.state.userState,
            userAddress: this.state.userAddress,
            active: true,
            updated_at: Timestamp.now()
          })
        } catch (err) {
          alert(err)
        }

        

        this.setState({
          items: items,
          userName: '',
          userEmail: '',
          userAge: '',
          userGenre: 'Mujer',
          userCountry: '',
          userState: '',
          userAddress: '',
          active: true,
          isValidEmail: true
        });
  
        document.getElementById('registered-users').scrollIntoView()
        alert("Registro actualizado correctamente");
  
        return true;
      }
    }
  }

  

  // Obtención de usuarios de base de datos (Firebase)
  async getUsers() {
    try {

      let tempItems = [],
          collectionIds = [];

      const q = query(collection(db, "users"), where("active", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc, key) => {
        
        tempItems.push(doc.data())
        collectionIds.push(doc.id)
      });

      tempItems.forEach((elem, key) => {
        elem['collectionId'] = collectionIds[key];
      });
      

      this.setState({
        items: tempItems
      })


    } catch (err) {
      alert(err)
    }
  }


  // Renderizado de usuarios en la vista
  renderUsers(){
    return <div>
      {this.state.items.map((item, index) => {
        return (
          <div className={`user-info ${item.active}`} key={index}>
            <div className="form-group">
              <p className="font-weight-bold">{item.userName}</p>
              <p>{item.userEmail}</p>
              <p>{item.userAge} años</p>
              <p>{item.userGenre}</p>
              <p>{this.state.countries[item.userCountry-1].name}, {this.state.countries[item.userCountry-1].states[item.userState-1].name}</p>
              <p>{item.userAddress}</p>
            </div>
            <div className="form-group">
              <button type="button" onClick={this.deleteUser.bind(this)} value={item.userEmail} className="btn">Borrar registro</button>
            </div>
            <hr/>
          </div>
        );
      })}
    </div>
  }

  // Obtención de países y carga de usuarios inicial
  componentDidMount() {
    fetch("http://localhost:3000/countries.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            countries: result.countries
          });

          this.getUsers()
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  


  // Renderizado de la vista
  render() {
    return (
      <div className="container-flex">
        <div>
        <form>
          <div className={`form-group ${this.state.isUserName}`}>
            <label htmlFor="txt-name">
              Nombre
            </label>
            <input type="text" name="userName" id="txt-name" placeholder="Nombre" maxLength={100} value={this.state.userName} onChange={this.handleChange.bind(this)} />
          </div>

          <div className={`form-group ${this.state.isUserEmail}`}>
            <label htmlFor="txt-name">
              Correo electrónico
            </label>
            <input type="email" name="userEmail" id="txt-email" placeholder="Correo electrónico" maxLength={100} value={this.state.userEmail} onChange={this.handleChange.bind(this)} onKeyUp={this.validateEmail.bind(this)}  />
          </div>

          <div className={`form-group ${this.state.isUserAge}`}>
            <label htmlFor="txt-age">
              Edad
            </label>
            <input type="text" name="userAge" id="txt-age" placeholder="Edad" value={this.state.userAge} onChange={this.handleChange.bind(this)} minLength={1} maxLength={3} onPaste={(e) => {e.preventDefault(); return false; }} onKeyPress={(event) => {  if (!/[0-9]/.test(event.key)) {  event.preventDefault();  }  }} />
          </div>

          <div className="form-group">
            <label>
              Género
            </label>
            <label className="genre-label">
              <input
                  type="radio"
                  name="userGenre"
                  value="Mujer"
                  checked={this.state.userGenre === "Mujer"}
                  onChange={this.handleChange.bind(this)}
                />
                Mujer
            </label>
            <label className="genre-label">
              <input
                  type="radio"
                  name="userGenre"
                  value="Hombre"
                  checked={this.state.userGenre === "Hombre"}
                  onChange={this.handleChange.bind(this)}
                />
                Hombre
            </label>
            <label className="genre-label">
              <input
                  type="radio"
                  name="userGenre"
                  value="Otro género"
                  checked={this.state.userGenre === "Otro género"}
                  onChange={this.handleChange.bind(this)}
                />
                Otro género
            </label>
          </div>

          <div className={`form-group ${this.state.isUserCountry}`}>
            <label htmlFor="txt-country">
              País
            </label>
            
            <select name="userCountry" id="txt-country" value={this.state.userCountry} onChange={this.handleCountryChange.bind(this)} >
              <option value="" default>- Elige -</option>
              
              {this.state.countries.map((e, key) => {
                return <option key={key} value={e.id}>{e.name}</option>;
              })}
            </select>

          </div>


          <div className={`form-group ${this.state.isUserState}`}>
            <label htmlFor="txt-state">
              Estado
            </label>
            <select name="userState" id="txt-state" value={this.state.userState} onChange={this.handleChange.bind(this)}>
              <option value="" default>- Elige -</option>
              {this.state.userCountry > 0 ?
                this.state.countries[this.state.userCountry-1].states.map((e, key) => {
                  return <option key={key} value={e.id}>{e.name}</option>;
                })
                : ''
              }

              
            </select>
          </div>

          <div className={`form-group ${this.state.isUserAddress}`}>
            <label htmlFor="txt-address">
              Dirección
            </label>
            <textarea name="userAddress" id="txt-address" placeholder="Dirección" value={this.state.userAddress} onChange={this.handleChange.bind(this)} />
          </div>

          <div className="form-group">
            <button type="button" onClick={this.saveUser} className="btn">Guardar registro</button>
            {/* Type=button evita el envío del formulario*/}
          </div>
        </form>
        </div>
        <div id="registered-users">
        <div className="registered-users">
          <p className="h3">Usuarios registrados</p>
          {this.renderUsers()}
        </div>
      </div>
      </div>
    )
  }
} 

export default FormComponent;