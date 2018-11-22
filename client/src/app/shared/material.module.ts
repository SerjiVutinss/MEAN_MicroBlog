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
    MatGridListModule
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatGridListModule
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
        MatGridListModule
    ]
})

export class MaterialModule { }