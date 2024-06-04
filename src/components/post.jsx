import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Card, Avatar, Button, Input, avatar } from '@nextui-org/react';
import { posts as initialPosts} from './postlist';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

const PostList = ({ newPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const inputRefs = useRef({})

  useEffect(() => {
    try {
      setLoading(true);
      const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      setPosts([...savedPosts, ...initialPosts]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts from localStorage');
      setPosts(initialPosts);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (newPost && newPost.length) {
      setPosts(prevPosts => [newPost[0], ...prevPosts]);
    }
  }, [newPost]);

  useEffect(() => {
    try {
      localStorage.setItem('posts', JSON.stringify(posts.filter(post => post.id > initialPosts.length)));
    } catch (err) {
      setError('Failed to save posts to localStorage.')
    }
  }, [posts]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.liked;
        return { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1, liked: !isLiked };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim()) {
      return;
    }

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, { user: 'Linh Tran', comment, avatar: 'https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg' }] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const focusCommentInput = (postId) => {
    const input = inputRefs.current[postId]
    if (input) {
      input.focus();
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {posts.map(post => (
        <Card className='max-w-xl mx-auto mb-5' key={post.id}>
          <div className='flex ml-5 my-3 items-center'>
              <Avatar className='mr-4' isBordered src={post.avatar} />
              <div>
                <h4 className='font-semibold text-base'>{post.name}</h4>
                <p className='text-sm'>{post.time}</p>                
              </div>
          </div>

          <p className='ml-5 mb-2'>{post.content}</p>
          
          {post.photo && <img className='mb-3' src={post.photo} alt="Post photo" />}

          <hr />
          
          <div className='my-1 flex grid gap-x-1 grid-cols-3 mx-2'>
            <Button  variant='light' onPress={() => handleLike(post.id)}>
              <FontAwesomeIcon icon={faThumbsUp} /> {post.liked ? 'Liked' : 'Like'} ({post.likes}) 
            </Button>
            <Button variant='light' onPress={() => focusCommentInput(post.id)}>
              <FontAwesomeIcon icon={faComment} flip="horizontal" />Comment
            </Button>
            <Button variant='light' >
              <FontAwesomeIcon icon={faShare} />Share
            </Button>
          </div>

          <hr />
          
          {post.comments.map((comment, index) => (
            <div className='my-3 ml-1.5 flex items-center' key={index}>
              <Avatar isBordered className='mx-3' src={comment.avatar} />
              <div className='rounded-lg border border-2 border-zinc-400 py-1 px-2'>
                <p className='font-semibold text-sm'>{comment.user}</p>
                <p className='text-sm'>{comment.comment}</p>
              </div>             
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const comment = e.target.elements.comment.value;
              if (comment.trim()) {
                handleComment(post.id, comment);
              e.target.reset();
              }             
            }}
          >
            <div className='flex justify-evenly mt-4 mb-3'>
              <Avatar isBordered src='https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg' />
              <Input 
                name="comment" 
                placeholder="Write a comment..." 
                ref={(el) => inputRefs.current[post.id] = el}
                className='max-w-sm'
              />
              <Button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></Button>
            </div>           
          </form>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
