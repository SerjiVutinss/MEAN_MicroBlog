import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCreateDialogComponent } from './comment-create-dialog.component';

describe('CommentCreateComponent', () => {
  let component: CommentCreateDialogComponent;
  let fixture: ComponentFixture<CommentCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCreateDialogComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
