# super-modal [![Build Status](https://travis-ci.com/PrecisionNutrition/super-modal.svg?token=Y8mfZMTrTcJd8Mz5UCHm&branch=master)](https://travis-ci.com/PrecisionNutrition/super-modal)

A versatile, CSS-only, scrollable modal that shrink wraps its content. You must define your own styles for now.

## Requirements

* SuitCSS Grid
* SuitCSS Flex Utility Classes

## Elements

* `-outer` - The outermost container of all modal pieces
* `-overlay` - The darkened background
* `-inner` - The centred area that holds the content
* `-closeButton` - The close button

## Attributes

* `modifierClassName`   - (Optional) Class name to add to the modal to differentiate between modals for styling purposes
* `outerClassNames`     - (Optional) Class names to add to the `-outer` div
* `overlayClassNames`   - (Optional) Class names to add to the `-overlay` div
* `innerClassNames`     - (Optional) Class names to add to the `-inner` div
* `disableOverlayClose` - (Optional) Remove the ability to click on the overlay to close the modal

## NOTES:

Because the SuperModal shrink wraps its content (i.e., the `-inner` div contracts to fit the content inside of it), its behaviour can depend on the type of content that it holds.

If the content has a set width or max-width, no problem, the `-inner` div will shrink to fit it. But if the content doesn't have a fixed width - like a bunch of 100% wide paragaphs for example - you must supply a max-width for the `-inner` div so that the modal doesn't fill the full width of the window. You can do this  in a few different ways:

* By passing in a max width utility class into the `innerClassNames` attribute
* Adding a `max-width` property to a custom `SuperModal-inner` CSS rule.
* Wrapping the content in a div and adding a max-width to that

Inversely, it can happen that the `-inner` div shrink wraps the content a little too much and the modal becomes too narrow. If this happens, add a `width: 100%; max-width: Xrem` (where Xrem is the desired width of the modal) to your `-inner` custom CSS rule, or pass equivalent utility classes into the `innerClassNames` attribute.


## Example CSS

Copy this CSS to lay the foundation for your modal.

```
.SuperModal {

  /* Elements */

  &-outer {
    position: fixed;  /* Required */
    top: 0;           /* Required */
    right: 0;         /* Required */
    bottom: 0;        /* Required */
    left: 0;          /* Required */
    z-index: xxxx;    /* Required */

    padding: 1rem !important;
  }

  &-overlay {
    position: fixed; /* Required */
    top: 0;          /* Required */
    right: 0;        /* Required */
    bottom: 0;       /* Required */
    left: 0;         /* Required */
    z-index: xxxx;   /* Required */

    background-color: rgba(0, 15, 27, 0.9);
  }

  &-inner {
    margin: auto;                   /* Required */
    flex-basis: auto !important;    /* Required */
    overflow-y: auto;               /* Required */
    max-height: 100%;               /* Required */
    position: relative;             /* Required */
    z-index: xxxx;                  /* Required */

    background-color: white;
    border-radius: 1rem;
  }

  &-closeButton {
    position: absolute; /* Required */
    top: 0;             /* Required */
    right: 0;           /* Required */
    width: 3rem;        /* Required */
    height: 3rem;       /* Required */

    font-size: 1.2rem;
    font-weight: bold;
  }

  // The following is used to create a fullscreen modal similar to our fitpro photo comparison tool

  &--fullscreen {
    .SuperModal-inner {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      margin-left: 0;
      margin-right: 0;
    }

    .SuperModal-closeButton {
      color: white;
      z-index: xxxx;
      font-size: 2rem;
    }
  }
}
```
