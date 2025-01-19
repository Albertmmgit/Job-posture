import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideoComponent } from './components/video/video.component';
import { HowUseComponent } from './components/how-use/how-use.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent, children: [
        {path: "", pathMatch: 'full', redirectTo: 'how-use'},
        {path: 'how-use', component: HowUseComponent},
        {path: 'camara', component: VideoComponent}
    ]},
    
];
