import { useState } from 'react';
import { Card, Button, Avatar, Input, Popover, PopoverTrigger, PopoverContent, Tabs, Tab } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import PostList from './post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function HomePost() {
  const { register, handleSubmit, reset } = useForm();
  const [newPost, setNewPost] = useState(null);
  const [input, setInput] = useState('')

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const onSubmit = data => {
    const post = {
      id: Date.now(),  
      avatar: 'https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg',
      name: 'Linh Tran',
      time: 'Just now',
      content: data.content,
      photo: data.photo,
      comments: [],
      likes: 0
    };
    setNewPost(post);
    try {
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      localStorage.setItem('posts', JSON.stringify([post, ...existingPosts]));
    } catch (err) {
      console.log('Failed to save new post to localStorage:', err);
    }
    reset();
    setInput('')
  };

    return (
        <div>
            <Card className='max-w-2xl mx-auto mb-5 shadow-xl'>
              <form className='flex py-3 justify-evenly' onSubmit={handleSubmit(onSubmit)}>
                <Avatar isBordered src="https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg" />
                <Input 
                  {...register('content')} 
                  placeholder="What's on your mind?" 
                  className='rounded-full max-w-sm' 
                  value={input}
                  onChange={handleInputChange}
                />
                <Popover>
                  <PopoverTrigger>
                    <Button ><FontAwesomeIcon icon={faPlus} /></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Input {...register('photo')} placeholder="Photo URL (optional)" />
                  </PopoverContent>
                </Popover>
                <Button type="submit" disabled={input.trim() === ''}>Post</Button>
              </form>
            </Card>
      
          <PostList newPost={newPost} />
        </div>
        
    )

}