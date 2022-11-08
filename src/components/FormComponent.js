import React from "react";
 
class FormComponent extends React.Component {
  constructor() {
    super();
    
    this.state = {
      count : 0,
      userName: '',
      isUserName: '',
      userAge: '',
      isUserAge: '',
      userGenre: 'Mujer',
      countries: [],
      userCountry: 0,
      isUserCountry: '',
      userState: '',
      isUserState: '',
      userAddress: '',
      isUserAddress: '',
      items: [],
    };
    this.handleChange = this.handleChange.bind(this);

    this.saveUser = this.saveUser.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });

    console.log(e.target.name);
    console.log(e.target.value);
    
    console.log(this.state);
    console.log(this.state.userCountry);
  }

  saveUser() {
    if(this.state.userName === '') {
      this.setState({ isUserName: "error" });
    } else {
      this.setState({ isUserName: '' });
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

    if (this.state.userName === '' || this.state.userAge === '' || this.state.userCountry === '' || this.state.userState === '' || this.state.userAddress === '') {
      return false;
    }

    let items = this.state.items;

    items.push({
      userName: this.state.userName,
      userAge: this.state.userAge,
      userGenre: this.state.userGenre,
      userCountry: this.state.userCountry,
      userState: this.state.userState,
      userAddress: this.state.userAddress,
    });

    console.log(items);

    this.setState({
      count: this.state.count + 1,
      items: items,
      userName: '',
      userAge: '',
      userGenre: 'Mujer',
      userCountry: '',
      userState: '',
      userAddress: '',
    });

    document.getElementById('registered-users').scrollIntoView()
  }

  renderUsers(){
    return <div>
      {this.state.items.map((item, index) => {
        return (
          <div className="user-info" key={index}>
            <p className="font-weight-bold">{item.userName}</p>
            <p>{item.userAge} años</p>
            <p>{item.userGenre}</p>
            <p>{this.state.countries[item.userCountry-1].name}, {item.userState}</p>
            <p>{item.userAddress}</p>
            <hr/>
          </div>
        );
      })}
    </div>
  }

  componentDidMount() {
    fetch("http://localhost:3000/countries.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            countries: result.countries
          });

          console.log(this.state.countries)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }









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
            
            <select name="userCountry" id="txt-country" value={this.state.userCountry} onChange={this.handleChange.bind(this)} >
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
                  return <option key={key} value={e.value}>{e.name}</option>;
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
          <h2> {this.state.count}</h2> 
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