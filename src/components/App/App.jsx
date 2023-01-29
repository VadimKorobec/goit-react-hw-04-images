import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { fetchImages } from 'services/pixabayApi';
import { Wrapper } from './App.styled';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
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

  handleSubmit = query => {
    this.setState({ query, isLoading: true, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  renderButtonOrLoader = () => {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      !!this.state.images.length &&
        this.state.images.length < this.state.totalImages && (
          <Button onLoadMore={this.handleLoadMore} />
        )
    );
  };
  render() {
    const { images } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {<Wrapper>{this.renderButtonOrLoader()}</Wrapper>}
        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </>
    );
  }
}
