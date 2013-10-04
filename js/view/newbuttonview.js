/**
 * New comment creation button
 *
 * @class NewButtonView
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */
/*global CommentModel, FormView */
var NewButtonView = Backbone.View.extend(
/** @lends NewButtonView.prototype */
	{
		formview: null,
		/**
		 * The map of delegated event handlers
		 * @type Object
		 */
		events: {
			'click': 'createComment'
		},
		
		/**
		 * Initialize view, make sure button has a comment collection to work with
		 */
		initialize: function () {
			if (this.collection === undefined) {
				throw 'NoCollectionDefined';
			}
		},
		
		/**
		 * Click event handler that first creates a new empty comment model, and assigns the model to a FormView instance.
		 * FormView will handle internally new comment creation and existing comment editing.
		 * @returns {Boolean} Returns false to stop propagation
		 */
		createComment: function () {
			if(this.formview == null){//question 2
				// create new comment model
				//Question 5, if collection is larger than 1
				var comment;
				lastIndex = this.collection.length-1;
				if(lastIndex >=0)
					comment  = new CommentModel({author: this.collection.at(lastIndex).get("author")});
				else
					comment = new CommentModel({});

				// render form view right after new button
				this.formview = new FormView({model: comment});
				this.$el.after(this.formview.render().$el);
			
				// add saved model to collection after form was submitted successfully
				this.formview.on('success', this.handleFormSuccess, this);
				
				// finally, return false to stop event propagation
				return false;
			}else{
				this.formview.cancel();
				this.formview = null;
				this.createComment();
			}
		},
		
		/**
		 * Method to handle FormView success event
		 * @param {CommentModel} model Model data returned by FormViews save request
		 */
		handleFormSuccess: function (model) {
			this.collection.add(model);
			//make our formview variable available for use
			this.formview = null;
		}
	
	}
);