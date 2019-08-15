/* eslint no-param-reassign: "error" */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner, MdStar } from 'react-icons/all';

import { MdAddShoppingCart } from 'react-icons/md';
import Container from '../../components/Container';
import { ComicList, Loading, Button, Star } from './styles';

import { formatPrice } from '../../util/format';

import api from '../../services/api';
import KeyMarvel from '../../services/keymarvel';

import * as CardActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

export default function Favorite() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const result = await Promise.all(
        favorite.map(item => {
          return api.get(`/comics`, {
            params: {
              ...KeyMarvel.getApiParams(),
              id: item,
            },
          });
        })
      );

      const data = result.map(comic => ({
        ...comic.data.data.results[0],
        priceFormat: formatPrice(comic.data.data.results[0].prices[0].price),
      }));

      setLoading(false);
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
      {!loading || (
        <Loading>
          <FaSpinner size={50} />
        </Loading>
      )}

      <ComicList>
        {comics.map(item => (
          <li key={item.id}>
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.title}
            />
            <strong>{item.title}</strong>
            <Star>
              <span>
                {item.priceFormat} {item.color}
              </span>
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
