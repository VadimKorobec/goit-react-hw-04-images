import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleToggelModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;

    return (
      <>
        <li className="ImageGalleryItem">
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt={tags}
            onClick={this.handleToggelModal}
          />
        </li>
        {isModalOpen && (
          <Modal url={largeImageURL} onClose={this.handleToggelModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
};
