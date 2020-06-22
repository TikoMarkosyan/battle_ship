import React , { Component } from 'react';
import './Draw.css';
class Draw extends Component {
  constructor(props){
    super(props)
}

  render(){
    const { data,shipsRelocation,bool} = this.props;
      return(
          <div className="boxs">
              <table>
                  <tbody>
                      {data.map((el,i) => {
                        return(
                          <tr className="th" key={i}>
                            {el.map((e,j) => {
                              return(
                                <td className="td" id={i+""+j} name={bool ? i+""+j : null}  onClick={shipsRelocation} key={i+""+j}>
                                    <p>{e === 0 ||e === 2  ? "" : e }</p>
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                  </tbody>
              </table>
          </div>
      )
  }
}
export default Draw;
