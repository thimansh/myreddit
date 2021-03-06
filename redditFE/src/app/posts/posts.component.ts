import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Post } from '../model/post';
import { PostService} from '../services/posts.service';
/**
 * 
 * 
 * @export
 * @class PostComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  newPost: Post;
  editPost: Post;
  searchCriteria: string;
  
  constructor(
    private postService: PostService
  ) { }
/**
 * 
 * 
 * @memberof PostComponent
 */
ngOnInit() {
    this.newPost = Post.CreateDefault();
    this.editPost = Post.CreateDefault();
    this.searchCriteria = '';
    this.getPosts();
  }
/**
 * @param {Post} post 
 * @memberof PostComponent
 * calls the delete post service
 * removes a post from the page
 */
deletePost(post:Post)
  {
    this.postService.deletePost(post)
    .subscribe(
      data => {
        this.posts.splice(this.posts.indexOf(post), 1);
        console.log("Post deleted!");
      })
  }

  /**
   * inserts a post onto the page
   * calls the insertNewPost Service
   * @memberof PostComponent
   */
  insertPost() {
    this.postService
    .insertNewPost(this.newPost)
    .subscribe(
      data => {
         this.newPost._id = data.id;
         this.posts.push(this.newPost);
         this.newPost = Post.CreateDefault();
    
         console.log("Added post.");
      }
    )
  }
  /**
   * 
   * 
   * @param {any} $scope 
   * @memberof PostComponent
   */
  AppCtrl($scope) {
      $scope.currentNavItem = 'page1';
    }
/**
 * Calls the update Post service
 * 
 * @param {Post} post 
 * @memberof PostComponent
 */
updatPost(post:Post) {
    this.postService
    .updatePost(this.newPost)
    .subscribe(
      data => {
         var index = this.posts.findIndex(item => item._id === this.editPost._id);
         this.posts[index] = this.editPost;
         this.editPost = Post.CreateDefault();
    
         console.log("Added post.");
      }
    )
  }
  
/**
 * gets a post based on a particular search criteria
 * 
 * @memberof PostComponent
 */
getPosts(){
    this.postService.getPosts(this.searchCriteria)
    .subscribe(
      data => {
         this.posts = [];
         data.forEach(
           element => {
             var newPost = new Post(element._id, 
                                element.title, 
                                element.text,
                                element.subreddit,
                              element.imageurl,
                            element.votes,
                          element.comments);
             this.posts.push(newPost);
           })
      })
  }

  
  upVote(post:Post){
    console.log(post)
    this.postService.upVote(post)
    .subscribe(
      data => {
         this.getPosts();
         console.log("feVote increased");
      }
    )
  }

  downVote(post:Post){
    this.postService.downVote(post)
    .subscribe(
      data => {
         this.getPosts();
         console.log("feVote decreased");
      }
    )
  }

  // comments(post:Post){
  //   console.log(post)
  //   this.postService.comments(post)
  //   .subscribe(
  //     data => {
  //        this.getPosts();
  //        console.log("feVote increased");
  //     }
  //   )
  // }
  
/**
 * 
 * empties the search criteria
 * @memberof PostComponent
 */
clearSearch(){
     this.searchCriteria = '';
     this.getPosts();
   }

  setEditPost(post: Post){
    this.editPost = new Post(post._id, post.title, post.text, post.subreddit,post.imageurl,post.votes,post.comments);
  }
}
