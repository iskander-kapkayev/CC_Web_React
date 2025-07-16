import '../styles/App.css';
import { NavigationBar } from 'NavigationBar';
import { Image } from 'Image';
import { Post } from 'Post';
import { CaptionForm } from 'CaptionForm';

function App() {
  return (
    <div>
      <NavigationBar />
      <Image />
      <Post />
      <CaptionForm />
    </div>
  );
}

export default App;
