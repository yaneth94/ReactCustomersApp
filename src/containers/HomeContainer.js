import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from './../components/AppFrame.js';
import CustomersActions from './../components/CustomersActions.js';

class HomeContainer extends Component {
    handleOnClick = () => {
        console.log("handleOnClick");
        this.props.history.push('/customers');
    }
    render() {
        return (
            <div>
                <AppFrame 
                    header="Home"
                    body={
                        <div>Esta es la pantalla inicial
                            <CustomersActions>
                                <button onClick={this.handleOnClick}>Listado de Clientes</button>
                            </CustomersActions>
                        </div>
                    }> 
                </AppFrame>
            </div>
        );
    }
}

//Con esta propiedad hereda por medio de inyeccion
export default withRouter(HomeContainer) ;