import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditDialogComponent } from './comment-edit-dialog.component';

describe('PostEditDialogComponent', () => {
  let component: PostEditDialogComponent;
  let fixture: ComponentFixture<PostEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
