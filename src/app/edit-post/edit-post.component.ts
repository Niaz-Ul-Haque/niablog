import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: String;
  constructor(
    private service: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service
      .getPostById(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.blogPost = data;
        this.tags = this.blogPost.tags.toString();
      });
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(',').map((tag) => tag.trim());
    this.service
      .updatePostById(this.blogPost._id, this.blogPost)
      .subscribe(() => {
        this.router.navigate(['admin']);
      });
  }

  //delte, misspelled in the documentation
  deletePost() {
    this.service.deletePostById(this.blogPost._id).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }
}
