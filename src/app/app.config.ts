import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RefsInterceptor } from 'angular-json-refs-interceptor';
import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { loginInterceptor } from './common/login.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
      importProvidersFrom(ReactiveFormsModule),
      importProvidersFrom([BrowserAnimationsModule,
        TranslateModule.forRoot({
        loader:{
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })]),
      provideHttpClient(withInterceptorsFromDi(),      
                        withInterceptors([loginInterceptor])),
      //$refs التعامل مع الاستجابة التي تحتوي على  
      {
          provide: HTTP_INTERCEPTORS, useClass: RefsInterceptor, multi: true
        }
]
};

export function HttpLoaderFactory(httpClient:HttpClient){
  return new TranslateHttpLoader(httpClient);
}
