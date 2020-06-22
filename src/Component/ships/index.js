import React,{ Component } from 'react';

class Ships extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { data,fun_ship,fun_toggles } = this.props;
    return(
      <div className="App">
        <table>
            <tbody>
                  <tr>
                    {
                      Object.keys(data).map((el,i) => {
                        return (
                          <td onClick={fun_ship} key={i}>
                              <p>{ el +" "+data[el].join("") }</p>
                          </td>
                        )
                      })
                    }
                  </tr>
            </tbody>
        </table>
        <button onClick={fun_toggles}>change V and H</button>
      </div>
    )
  }
}
export default Ships;
