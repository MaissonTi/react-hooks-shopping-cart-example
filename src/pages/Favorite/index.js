/* eslint no-param-reassign: "error" */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdStar } from 'react-icons/all';
import { MdAddShoppingCart } from 'react-icons/md';
import Container from '../../components/Container';
import { ComicList, Button, Star } from './styles';

import { formatPrice } from '../../util/format';

import * as CardActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

import json from '../../services/jsonApiMarvel';

export default function Favorite() {
  const [comics, setComics] = useState([]);

  const favorite = useSelector(state => state.favorite);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, item) => {
      sumAmount[item.id] = item.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      const result = favorite.map(id => {
        return json.data.filter(item => item.id === id)[0];
      });

      // FormatPrice
      const data = result.map(comic => ({
        ...comic,
        priceFormat: formatPrice(comic.prices[0].price),
      }));

      setComics(data);
    }
    load();
  }, [favorite]);

  const handleAddComic = item => {
    dispatch(CardActions.addToCart(item));
  };

  const handleStarComic = useCallback(
    item => {
      dispatch(FavoriteActions.flagFavorite(item));
    },
    [dispatch]
  );

  return (
    <Container>
      <ComicList>
        {comics.map(item => (
          <li key={item.id}>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.title}
            />
            <strong>{item.title}</strong>
            <Star>
              <span>{item.priceFormat}</span>
              <MdStar onClick={() => handleStarComic(item)} size={25} />
            </Star>

            <Button onClick={() => handleAddComic(item)}>
              <div>
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {amount[item.id] || 0}
                </div>
                <span>Add ao cart </span>
              </div>
            </Button>
          </li>
        ))}
      </ComicList>
    </Container>
  );
}
