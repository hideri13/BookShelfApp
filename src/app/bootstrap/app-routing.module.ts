import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../ui/not-found';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('../../pages/books-list/bootstrap/books-list.module').then(
        (m) => m.BooksListModule,
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../../pages/about/bootstrap/about.module').then(
        (m) => m.AboutModule,
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
