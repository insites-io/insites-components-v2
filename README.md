## Development

## Dependencies
- NodeJS v14^

### Components
- Open terminal
- run `cd components && npm start`

#### Development Pages
Development pages are ready to use dev environments for developing and testing components
- [Dev Environment](http://localhost:3333/assets/styleguide/dev.html)
- [Vue Environment](http://localhost:3333/assets/styleguide/vue.html)
- [ins-table Environment](http://localhost:3333/assets/styleguide/table-dev.html)

### Adding/Updating Styles
Component styles are located in the styles folder, files are named with its component counterpart. When creating a new component its better to name it the same with the component to make it easier to find and maintain.

- Open terminal
- run `cd styles && npm run serve`

### Updating Font Icons
1. Open `insites-font-icons.css`
2. Update the [query string](https://cbo.d.pr/yF2MLh) from the source file
3. Copy the new icons or the updated icons
4. Update external documentation

## Building for Deployment
To build components or styles, go to its respective folders and run `npm run build`.

## Releasing
1. Build components and styles

2. Go to release folder and rename the current version to its release version. eg v2.9.2 rename to v2.9.3

3. Delete all `.js` files inside it

4. Copy all files in `components/www/build` and paste it in the version folder (point 2).

5. Copy all insites css in `components/assets/css` and replace the files in the css folder in the version folder (point 2).
    
6. Delete all files in `release/v2/latest` folder

7. Copy all files in the version folder you are going to release (point 2)

7. Login to CBO AWS and go to [ins-styleguide](https://s3.console.aws.amazon.com/s3/buckets/ins-styleguide?region=us-west-2&tab=objects) bucket

8. First upload the new version folder

9. Then delete all files in the `v2/latest` folder

10. Upload the latest release files inside the `v2/latest` folder

11. Go to [AWS CloudFront](https://console.aws.amazon.com/cloudfront/v3/home?region=us-west-1#/distributions/EKAHJ8SFS25OG/invalidations)

12. Create invalidation with this object path `/v2/latest/*`