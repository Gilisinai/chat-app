import React from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
    }

    isFormVaild = () => {
        let errors = []
        let error
        if (this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields" }
            this.setState({ errors: errors.concat(error) })
            return false
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: "Password is not valid" }
            this.setState({ errors: errors.concat(error) })
            return false
        } else {
            return true
        }
    }

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false
        } else if (password !== passwordConfirmation) {
            return false
        } else {
            return true
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.isFormVaild()) {
            this.setState({ errors: [], loading: true})
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser)
                    
                    // this.setState({loading: false})
                })
                .catch(err => {
                    console.error(err)
                    this.setState({errors: this.state.errors.concat(err), loading: false})
                })
        }
    }

    handleInputError = (errors, inputName) => {
       return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    render() {

        const { username, email, password, passwordConfirmation, errors , loading} = this.state
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for Gili-Chat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconPosition="left" className={this.handleInputError(errors, 'username')}
                                placeholder="Username" value={username} onChange={this.handleChange} type="text" />

                            <Form.Input fluid name="email" icon="mail" iconPosition="left" className={this.handleInputError(errors, 'email')}
                                placeholder="Email Address" value={email} onChange={this.handleChange} type="email" />

                            <Form.Input fluid name="password" icon="lock" iconPosition="left" className={this.handleInputError(errors, 'password')}
                                placeholder="Password" value={password} onChange={this.handleChange} type="password" />

                            <Form.Input fluid name="passwordConfirmation" icon="lock" iconPosition="left" className={this.handleInputError(errors, 'passwordConfirmation')}
                                placeholder="Password Confirmation" value={passwordConfirmation} onChange={this.handleChange} type="password" />

                            <Button disabled={loading} className={loading ? 'loading': ''} color="orange" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}


export default Register