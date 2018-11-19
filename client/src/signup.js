import {Component} from 'react'
import Dom from 'react-dom'

class signup extends Component {
	constructor(props) {
		super(props);
		this.state({
			first_name: '',
			middle_name: '',
			last_name: '',
			user_name:'',
			display_name: '',
			email: '',
			password: '',
			password2: '',
		});
	}
	setInput(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(e.target.value);
	}
	render() {
		return(
			<div>
			 <form>
			  <input placeholder="First Name" onChange={this.setInput} />
			 </form>
			</div>
			)
	}
}