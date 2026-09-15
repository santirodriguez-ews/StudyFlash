import { RenderMode, ServerRoute } from '@angular/ssr'
import { CoreService } from './core/core.service'
import { inject } from '@angular/core'
import { lastValueFrom } from 'rxjs'

export const serverRoutes: ServerRoute[] = [
  {
    path: 'study/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const coreService = inject(CoreService)
      
      const topics = await lastValueFrom(coreService.getTopics())

      return topics.map(({ slug }) => ({ slug }))
    },
  },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
]
