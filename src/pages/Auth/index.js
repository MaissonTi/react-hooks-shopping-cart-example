/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/all';
import Container from '../../components/Container';
import { Form, SubmitButton } from './styles';
import KeyMarvel from '../../services/keymarvel';
import api from '../../services/api';

export default class Auth extends Component {
  state = {
    keys: {
      publicKey: '',
      privateKey: '',
    },
    errorMsg: '',
    loading: false,
  };

  componentDidMount = async () => {
    await KeyMarvel.logout();
  };

  handleSubmit = async e => {
    e.preventDefault();

    await this.setState({ errorMsg: '', loading: true });

    const { keys } = this.state;

    await KeyMarvel.setPublicKey(keys.publicKey);
    await KeyMarvel.setPrivateKey(keys.privateKey);

    this.checkAuth();
  };

  checkAuth = async () => {
    try {
      const result = await api('/characters', {
        params: { ...KeyMarvel.getApiParams(), id: 1009165 },
      });

      if (result && result.status === 200) {
        await localStorage.setItem('Auth', true);
        this.props.history.push('/');
      }
    } catch (error) {
      await KeyMarvel.logout();
      const errorMsg = 'Your public or private key is invalid';
      this.setState({ errorMsg, loading: false });
    }
  };

  updateField = async event => {
    const { keys } = this.state;
    keys[event.target.name] = event.target.value;
    await this.setState({ keys });
  };

  render() {
    const { publicKey, privateKey, errorMsg, loading } = this.state;

    return (
      <Container>
        <h1>
          <img
            src="http://images.universohq.com/2012/09/logo_marvel-g.jpg"
            alt=""
          />
        </h1>

        <p>
          Do not have an API key?
          <a
            href="https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a key now.
          </a>
        </p>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="publicKey"
            placeholder="Public Key"
            value={publicKey}
            onChange={e => this.updateField(e)}
          />

          <input
            type="text"
            name="privateKey"
            placeholder="Private Key"
            value={privateKey}
            onChange={e => this.updateField(e)}
          />

          {errorMsg && <div>{errorMsg}</div>}

          <SubmitButton loading={loading ? 1 : 0}>
            <span>{loading ? <FaSpinner /> : 'Authenticate'}</span>
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
