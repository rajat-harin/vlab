import React, {Component} from 'react'
import Axios from 'axios'

export default class ConfirmMail extends Component {
  
  //state to store status
  state = {
    confirming: true,
    msg: null
  }

  // When the component mounts the mongo id for the user is pulled  from the 
  // params in React Router. This id is then sent to the server to confirm that 
  // the user has clicked on the link in the email. The link in the email will 
  // look something like this: 
  // 
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  // 
  // where 5c40d...a9d42 is the unique id created by Mongo
  componentDidMount = () => {
    const { id } = this.props.match.params

    Axios.get(`/users/add/confirm/${id}`)
      .then(data => {
        this.setState({ 
          confirming: false,
          msg: data.data.msg
         })
         console.log(data.data.msg);
      })
      .catch(err => console.log(err))
  }

  // While the email address is being confirmed on the server a spinner is 
  // shown that gives visual feedback. Once the email has been confirmed the 
  // spinner is stopped and turned into a button that takes the user back to the 
  // <Landing > component so they can confirm another email address.
  render = () =>
  <section className="cover">
    <div className="confirm" style={{

position: "absolute",
left: "50%",
top: "50%",
transform: "translate(-50%, -50%)",
}}>
      {this.state.confirming
        ? <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div> 
        : <h5 style={{
          color: "white"
        }}>
          {this.state.msg} You can close this window or click on login up there.
          </h5>
      }
    </div>
    </section>
}