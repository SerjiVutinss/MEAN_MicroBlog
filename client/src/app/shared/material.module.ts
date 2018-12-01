import { NgModule } from "@angular/core";

import {
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
} from '@angular/material';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
    declarations: [DeleteDialogComponent],
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatGridListModule,
        MatTabsModule,
        MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatGridListModule,
        MatTabsModule,
        MatDialogModule
    ]
})

export class MaterialModule { }