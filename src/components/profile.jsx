import { Avatar, AvatarGroup, Card, Button, Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './fb.css';
import { faPlus, faThumbsUp, faShare, faComment } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";


const ProfilePage = () => {

    const { register, handleSubmit, reset } = useForm();
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');
    const inputRefs = useRef({})
  
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
        likes: 0,
        liked: false
      };
      setPosts([...posts, post]);
      reset();
      setInput('');
    };

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
        if (!comment.trim()) return;
        setPosts(posts.map(post =>
            post.id === postId 
                ? { ...post, comments: [...post.comments, { user: 'Linh Tran', comment, avatar: 'https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg' }] } 
                : post
        ));
    };

    const focusCommentInput = (postId) => {
        const input = inputRefs.current[postId]
        if (input) {
            input.focus();
        }
    }


    return (
        <div>
            <div className="mx-auto max-w-5xl relative">
                <div>
                    <img
                        src="https://i.pinimg.com/564x/8e/e9/2a/8ee92a877ff935fa075b87c95a294b51.jpg"
                        alt="cover photo"
                        className="object-cover w-full image"
                        style={{ margin: 'auto' }}
                    />
                    <div className="flex">
                        <Avatar 
                            src="https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg"
                            isBordered
                            className="avatar"
                        />       
                        <div className="flex flex-col mt-3">
                            <div className="font-bold text-3xl">Linh Tran</div>
                            <p className="mb-3 mt-1">326 Friends</p>
                            <AvatarGroup isBordered size="sm">
                                <Avatar src="https://i.pinimg.com/736x/f8/e0/8d/f8e08dada972ccb17cdb3082fc7b7f64.jpg" />
                                <Avatar src="https://i.pinimg.com/736x/06/03/e9/0603e949d20d07ee1fb5c24ee3fcd43f.jpg" />
                                <Avatar src="https://i.pinimg.com/564x/ef/ed/ec/efedec49b34bf0e4bba0a71db1380b1f.jpg" />
                                <Avatar src="https://i.pinimg.com/564x/77/75/40/777540eee6d84a6fa12d22c4e762fdc1.jpg" />
                                <Avatar src="https://i.pinimg.com/564x/a7/8e/18/a78e18cee2eb4eeda2eaae008fd02c8c.jpg" />
                            </AvatarGroup>
                        </div>
                    </div>   
               </div>
            </div>
            <div className="max-w-3xl mx-auto">
                <hr className="mx-auto mb-5"/>
                
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

                {posts.map(post => (
                    <Card key={post.id} className='max-w-2xl mx-auto mb-5 shadow-xl'>
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <Avatar src={post.avatar} isBordered className="mr-3" />
                                <div>
                                    <div className="font-bold">{post.name}</div>
                                    <div className="text-sm text-gray-500">{post.time}</div>
                                </div>
                            </div>

                            <div className='mt-3'>{post.content}</div>

                            {post.photo && <img src={post.photo} alt="post photo" className="mt-3 rounded-lg max-w-full" />}

                            <hr className="mt-2" />

                            <div className='my-1 flex grid gap-x-1 grid-cols-3 mx-2'>
                                <Button variant='light' onPress={() => handleLike(post.id)}>
                                    <FontAwesomeIcon icon={faThumbsUp} /> {post.liked ? 'Liked' : 'Like'} ({post.likes})
                                </Button>
                                <Button variant='light' onPress={() => focusCommentInput(post.id)}>
                                    <FontAwesomeIcon icon={faComment} flip="horizontal" />Comment
                                </Button>
                                <Button variant='light'>
                                    <FontAwesomeIcon icon={faShare} />Share
                                </Button>
                            </div>

                            <hr />

                            <div> 
                                {post.comments.map((comment, index) => (
                                    <div key={index} className='flex items-center my-2'>
                                        <Avatar src="https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg" isBordered className="mr-3" size="sm" />
                                        <div>
                                            <div className="font-bold text-sm">{comment.user}</div>
                                            <div className="text-sm">{comment.comment}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const comment = e.target.elements[`comment-${post.id}`]?.value
                                    if (comment.trim()) {
                                        handleComment(post.id, comment);
                                      e.target.reset();
                                      }
                                }}
                            >
                                <div className='flex items-center mt-3'>
                                <Avatar src="https://i.pinimg.com/564x/9f/55/a9/9f55a91576f08e9e7713b89124d0bce3.jpg" isBordered className="mr-3" size="sm" />
                                <Input
                                    name={`comment-${post.id}`}
                                    placeholder="Write a comment..."
                                    className='rounded-full w-full'
                                    ref={(el) => inputRefs.current[post.id] = el}
                                />
                            </div>
                            </form>
                        </div>
                    </Card>
                ))}
            </div>          
        </div>
    )
}

export default ProfilePage