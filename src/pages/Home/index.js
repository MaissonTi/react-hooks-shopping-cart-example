import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner, MdStar } from 'react-icons/all';
import { MdAddShoppingCart } from 'react-icons/md';
import Container from '../../components/Container';
import { ComicList, PageActions, Loading, Button, Star } from './styles';

import { formatPrice } from '../../util/format';

import api from '../../services/api';
import KeyMarvel from '../../services/keymarvel';

import * as CardActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';

export default function Home() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, item) => {
      sumAmount[item.id] = item.amount;
      return sumAmount;
    }, {})
  );
  const favorite = useSelector(state => JSON.stringify(state.favorite));

  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      const param = {
        params: {
          ...{ limit: 6, offset },
          ...KeyMarvel.getApiParams(),
        },
      };

      const result = await api.get('/comics', param);

      // FormatPrice
      const data = result.data.data.results.map(comic => ({
        ...comic,
        priceFormat: formatPrice(comic.prices[0].price),
      }));

      setComics(data);
      setLoading(false);
    }

    load();
  }, [offset]);

  const handleAddComic = item => {
    dispatch(CardActions.addToCart(item));
  };

  const handleStarComic = item => {
    dispatch(FavoriteActions.flagFavorite(item));
  };

  const handlePage = useCallback(
    action => {
      setLoading(true);

      const pageNow = action === 'back' ? page - 1 : page + 1;
      const offsetNow = action === 'back' ? offset - 6 : offset + 6;

      setPage(pageNow);
      setOffset(offsetNow);
    },
    [page, offset]
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
            <Star cor={favorite.indexOf(item.id)}>
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
                <span>Add to cart </span>
              </div>
            </Button>
          </li>
        ))}
      </ComicList>

      <PageActions>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage('back')}
        >
          Back
        </button>
        <span>Page {page}</span>
        <button
          type="button"
          disabled={page === 1 && comics.length === 1}
          onClick={() => handlePage('next')}
        >
          Next
        </button>
      </PageActions>
    </Container>
  );
}
