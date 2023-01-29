import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from 'services/pixabayApi';
import { Wrapper } from './App.styled';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalImages, setTotalImages] = useState(0)
  const [error, setError] = useState(null)

 

  const componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page)
        .then(resp => {
          this.setState(prev => ({
            images:
              page === 1 ? [...resp.hits] : [...prev.images, ...resp.hits],
            totalImages: resp.totalHits,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

const  handleSubmit = query => {
    setQuery(query);
    setIsLoading(true);
    setPage(1);
  };

  const handleLoadMore = () => {
  setIsLoading(true)
    setPage(prevPage => prevPage + 1);
  };

const   renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      !!images.length &&
        images.length < totalImages && (
          <Button onLoadMore={this.handleLoadMore} />
        )
    );
  };
  
    

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} />
        {<Wrapper>{renderButtonOrLoader()}</Wrapper>}
        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </>
    );
  }

