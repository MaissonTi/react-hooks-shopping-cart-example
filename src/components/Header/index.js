import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket, MdStar } from 'react-icons/md';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo_marvel-g.jpg';

import { Container, Cart, Star } from './styles';

function Header({ cartLength, starLength }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Logo marvel" />
      </Link>

      <Star to="/favorite">
        <div>
          <strong>Favorites</strong>
          <span>{starLength}</span>
        </div>
        <MdStar size={36} />
      </Star>

      <Cart to="/cart">
        <div>
          <strong>Shopping cart</strong>
          <span>{cartLength}</span>
        </div>
        <MdShoppingBasket size={36} />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartLength: state.cart.length,
  starLength: state.favorite.length,
}))(Header);
