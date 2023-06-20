import { getPhotoApi } from 'api/pixabayApi';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Searchbar from 'components/Searchbar';
import { useEffect, useState } from 'react';
const PER_PAGE = 20;

function App() {
  const [image, setImage] = useState([]);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [ref, setRef] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (page === 1) {
      return;
    }

    if (image.length === page * PER_PAGE) {
      const elementToScroll = ref.current.children[PER_PAGE * (page - 1)];
      elementToScroll.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [ref, page, image]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    if (image.length < page * PER_PAGE) {
      setStatus('pending');

      getPhotoApi(text, page, PER_PAGE)
        .then(({ data: { hits } }) => {
          const status = hits.length < PER_PAGE ? 'idle' : 'resolved';
          setImage([...image, ...hits]);
          setStatus(status);
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [page, text, image]);

  const getRef = ref => {
    setRef(ref);
  };

  const sendPhoto = text => {
    setImage([]);
    setStatus('pending');
    setPage(1);

    getPhotoApi(text, page, PER_PAGE)
      .then(({ data: { hits } }) => {
        if (hits.length === 0) {
          throw new Error('Картинок не знайдено');
        }

        const status = hits.length < PER_PAGE ? 'idle' : 'resolved';

        setImage(hits);
        setText(text);
        setStatus(status);
      })
      .catch(({ message }) => {
        setError(message);
        setStatus('rejected');
      });
  };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  return (
    <>
      <Searchbar sendPhoto={sendPhoto} />
      <ImageGallery image={image} getRef={getRef} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button onClick={loadMore} />}
      {status === 'rejected' && <h1>{error}</h1>}
    </>
  );
}

export default App;

// class App extends Component {
//   state = {
//     image: [],
//     text: '',
//     page: 1,
//     error: '',
//     status: 'idle',
//     ref: null,
//     scrollTo: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { page, text, image, ref } = this.state;

//     if (page === 1) {
//       return;
//     }

//     if (prevState.image !== image) {
//       // console.log(1, page);
//       const elementToScroll =
//         ref.current.children[PER_PAGE * (prevState.page - 1)];

//       elementToScroll.scrollIntoView({
//         behavior: 'smooth',
//       });
//     }

//     if (prevState.page !== page) {
//       // console.log(2, page);
//       this.setState({ status: 'pending' });

//       getPhotoApi(text, page, PER_PAGE)
//         .then(({ data: { hits } }) => {
//           const status = hits.length < PER_PAGE ? 'idle' : 'resolved';
//           this.setState({
//             image: [...prevState.image, ...hits],
//             status,
//           });
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }
//   getRef = ref => {
//     this.setState({ ref });
//   };

//   sendPhoto = text => {
//     this.setState({ image: [], status: 'pending', page: 1 });

//     getPhotoApi(text, 1, PER_PAGE)
//       .then(({ data: { hits } }) => {
//         if (hits.length === 0) {
//           throw new Error('Картинок не знайдено');
//         }
//         const status = hits.length < PER_PAGE ? 'idle' : 'resolved';
//         this.setState({ image: hits, text, status });
//       })
//       .catch(({ message }) =>
//         this.setState({ error: message, status: 'rejected' })
//       );
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { image, status, error } = this.state;
//     const { sendPhoto, loadMore, getRef } = this;

//     return (
//       <>
//         <Searchbar sendPhoto={sendPhoto} />
//         <ImageGallery image={image} getRef={getRef} />
//         {status === 'pending' && <Loader />}
//         {status === 'resolved' && <Button onClick={loadMore} />}
//         {status === 'rejected' && <h1>{error}</h1>}
//       </>
//     );
//   }
// }

// export default App;
