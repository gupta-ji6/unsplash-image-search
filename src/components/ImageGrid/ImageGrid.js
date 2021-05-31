import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ModalContext } from '../../context/ModalContext';
import { SearchContext } from '../../context/SearchContext';
import Modal from '../Modal/Modal';
import './ImageGrid.css';
import Loader from '../Loader/Loader';
import ErrorDialog from '../ErrorDialog/ErrorDialog';

const UNSPLASH_URL = 'https://api.unsplash.com/';
const DEFAULT_COLLECTION_ID = 2423569;

const ImageGrid = () => {
  const { query, sortBy, color, orientation } = useContext(SearchContext);
  const { showModal, setShowModal } = useContext(ModalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [selectedImg, setSelectedImg] = useState([]);

  const fetchCollectionPhotosById = async (collectionId) => {
    const requestConfig = {
      headers: {
        'Accept-Version': 'v1',
      },
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN,
        per_page: 16,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        `${UNSPLASH_URL}collections/${collectionId}/photos`,
        requestConfig
      );
      console.log(response?.data);
      setInitialData(response?.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error(err.message);
    }
  };

  const fetchPhotosByQuery = async (pageNo) => {
    console.log({ pageNo });
    const requestConfig = {
      headers: {
        'Accept-Version': 'v1',
      },
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_TOKEN,
        query: query,
        page: page,
        order_by: sortBy,
        ...(color === 'any' ? undefined : { color }),
        ...(orientation === 'any' ? undefined : { orientation }),
        // color: color === 'any' ? '' : color,
        // orientation: orientation === 'any' ? '' : orientation,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        `${UNSPLASH_URL}search/photos`,
        JSON.parse(JSON.stringify(requestConfig))
      );
      console.log(response?.data);
      setLoading(false);
      setData([...data, ...response?.data?.results]);
      setPage((oldPage) => oldPage + 1);
      // setData([...response?.data?.results]);
      if (response?.data?.total > initialData.length) {
        setHasMoreItems(true);
      } else {
        setHasMoreItems(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setHasMoreItems(false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      fetchCollectionPhotosById(DEFAULT_COLLECTION_ID);
    }
    return () => {
      unsubscribe = true;
    };
  }, []);

  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe) {
      if (query !== '') {
        fetchPhotosByQuery(page);
      } else {
        fetchCollectionPhotosById(DEFAULT_COLLECTION_ID);
      }
    }
    return () => {
      unsubscribe = true;
    };
  }, [query, color, sortBy, orientation]);

  const onImageClick = (e, img) => {
    setShowModal(true);
    setSelectedImg(img);
  };

  const imagesData = data.length > 0 ? data : initialData;

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={(pageNum) => fetchPhotosByQuery(pageNum)}
        hasMore={hasMoreItems}
        className='img_grid_container'
      >
        {imagesData.map((img) => (
          <Fragment key={img.id}>
            <div
              className='img_grid_item'
              onClick={(e) => onImageClick(e, img)}
            >
              <img
                src={img.urls.thumb}
                alt={img.alt_description}
                loading='lazy'
                className='img'
              />
              <div className='img_info_container'>
                <div className='user_name'>{img.user.name}</div>
              </div>
            </div>
            {showModal ? (
              <Modal
                imageAlt={selectedImg.alt_description}
                imageSrc={selectedImg.urls.full}
              />
            ) : null}
          </Fragment>
        ))}
      </InfiniteScroll>
      {loading ? <Loader /> : null}
      {(error !== null || imagesData.length === 0) && !loading ? (
        <ErrorDialog error={error} />
      ) : null}
    </div>
  );
};

export default ImageGrid;
