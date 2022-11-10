# Course Management Web Application

This project was made with MEAN Stack

## Project Description:

The objective of this project is to develop an application for management of courses taken by students, which includes a flow for students, a flow for teachers and a bulk notification feature.

## Project Prerequisites:

● HTML, CSS and JavaScript programming languages
● MongoDB
● Node.js
● Express.js
● Angular
● Knowledge of GitHub
● Basic understanding of the client-side processes and requirements
● Basic understanding of the server-side processes and requirements

## Adding Bootstrap via npm
https://stackoverflow.com/questions/37649164/how-to-add-bootstrap-to-an-angular-cli-project

## Adding Font Awesome Icons via npm
https://stackoverflow.com/questions/38796541/how-to-add-font-awesome-to-angular-2-cli-project

## Hiding elements in Bootstrap
https://getbootstrap.com/docs/4.0/utilities/display/

## Spacing in Bootstrap
https://getbootstrap.com/docs/4.3/utilities/spacing/

## Colors in Bootstrap
https://getbootstrap.com/docs/4.0/utilities/colors/

## Buttons in Bootstrap
https://getbootstrap.com/docs/4.0/components/buttons/

## Angular Material Dialog
https://material.angular.io/components/dialog/overview

## Close Angular Dialog
```
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
```

## How to make text responsive in Bootstrap

You can make text responsive in Bootstrap by using vw units or media queries.
The text size can be set with a vw unit, which means the "viewport width".

Viewport is the browser window size. 1vw = 1% of viewport width. If the viewport is 50cm wide, 1vw is 0.5cm

## Youtube video Embed
```
      <iframe src="https://www.youtube.com/embed/vlDzYIIOYmM?start=90&rel=0&autoplay=1&mute=1&controls=0"
      title="YouTube video"
      allowfullscreen>
      </iframe>
```
## dotenv package
https://medium.com/@thejasonfile/using-dotenv-package-to-create-environment-variables-33da4ac4ea8f