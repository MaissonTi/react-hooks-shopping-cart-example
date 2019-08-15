import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, ComicTable, Total } from './styles';
import * as CartAction from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

function Cart({ cart, total, removeFromCart, updateAmount }) {
  function increment(item) {
    updateAmount(item.id, item.amount + 1);
  }

  function decrement(item) {
    updateAmount(item.id, item.amount - 1);
  }

  return (
    <Container>
      <ComicTable>
        <thead>
          <tr>
            <th />
            <th>Comics</th>
            <th>Amount</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt={item.title}
                />
              </td>
              <td>
                <strong>{item.title}</strong>
                <span>{item.priceFormat}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(item)}>
                    <MdRemoveCircleOutline size={20} color="#fff" />
                  </button>
                  <input type="number" readOnly value={item.amount} />
                  <button type="button" onClick={() => increment(item)}>
                    <MdAddCircleOutline size={20} color="#fff" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{item.subtotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => removeFromCart(item.id)}>
                  <MdDelete size={20} color="#fff" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ComicTable>
      <footer>
        <button type="button"> Checkout </button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(item => ({
    ...item,
    subtotal: formatPrice(item.prices[0].price * item.amount),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, item) => total + item.prices[0].price * item.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch => bindActionCreators(CartAction, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
