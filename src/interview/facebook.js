/*

Facebook interview.

Be familiar with:
- hash tables
- linked lists
- stacks
- queues
- trees
- tries
- graphs
- vectors
- heaps

As well as fundamental algorithms like:
- breadth-first search
- depth-first search
- binary search
- merge sort
- quick sort

Given a binary tree, get the average value at each level of the tree.

Input:
    4
   / \
  7   9
 / \   \
10  2   6
     \
	  6
	 /
    2
Output:
[4, 8, 6, 6, 2]

I have a couple of questions. (It's important to ask clarifying questions!)
1. Will the input is always going to be a tree or can I get an empty node?
2. Is it all integer values? (Could have asked if it's ok to use integer division. But why?)
My own questions:
- Do I have to provide a formal node definition as a JS class or can I just assume we have
  plain objects with 'value', 'left' and 'right' fields?

Take a few minutes at the beginning of the interview to plan out a solution and check your
problem solving with your interviewer. Sonja made a plan and got confirmation from her
interviewer that she's on the right track.

I can use depth-first search to explore the tree and collect all of the numbers by level.
A hash table of a level to numbers at that level. And calculate the numbers at that level.

It's very important to chose a language you are familiar with. However, your interviewer
doesn't expect you to rememeber everything on the spot.

Sonja continually made it clear what she was thinking. This allows the interviewer to better
understand her problem solving skills. The interviewer might redirect her if she starts
going down the wrong path or gets stuck.

You probably won't run code in the online coding environment. It also won't be possible to run code
when you are writing on a whiteboard, which is what will happen if you come on-site.
If you're unsure of the syntax, say so and try your best. It's more important to know the language
has the feature than to know the exact syntax.

Since I can't run my code I'm going to go through example input to test my code.

Sonja worked through a test case to ensure her code works properly. Plan to always do this!

Be prepared to discuss time and space complexity. Study these concepts before your interview.
You will almost always be asked to explain the runtime and/or memory overhead.

O(n) - time (is read as "O of n")
n * 2, in other words also O(n) - space

Do you have any thoughts of how we could make this more efficient?

My thoughts:
- there might be a way to do without the hashmap
- there might be a way to keep calculating the average as we go (accumulatively), without a separate run

It's normal to feel challenged in our interviews. Sonja explained her thought process out loud
and listened to the interviewer's hint when she was figuring out what to do.

Ask meaningful questions: Sonja had questions that she was genuinely interested about.
The interview is also an opportunity for you to learn about FB.

I know Facebook mostly hires generalists and I'm wondering what the team matching
process looks like? (Bootcamp takes 2 months on average but can take longer. Assigned a bootcamp mentor).

Spend some time warming up the day of your interview by writing some code.
After your interviewer asks you the question, restate the question in your own words
and take some time to ask your own clarifying questions (like possible input, desired output,
or the nature of the problem). Don't be afraid to ask questions. Your interviewer is actually
expecting them, and asking questions is an important part of problem solving.

Before you begin coding, (create an example and) explain out loud how you'd like to solve the problem
and get feedback from your interviewer.

Explain your thought process out loud throughout the interview, especially if you encounter
a challenge. This might not be second nature to you, so practice thinking out loud while solving
a coding problem before you actually interview.

Our interviews are challenging for everyone and it's normal to get stuck. Explain what you're
thinking to the interviewer when it happens, such as the problem you see and different options
you're considering. This will allow your interviewer to assess your problem solving process
and ask you questions that could help you figure out the problem. What the interviewer points out
something or asks you a question during the interview, listen carefully and consider repeating
back what they've said.

Plan to test your code with a rigorous example. Walk through your written code carefully,
rather than your intended code. What you've written and what's in your mind might not be the same.
Bugs are not the end of the world, your interviewer will want to know how you go about identifying
them and fixing them.

Describe your solution and check to make sure your interviewer understands.
When you work on practice problems also practice explaining your code out loud.

Study time and space complexity. You will almost always be asked about this.

*/

let elements = {};

function traverse(root, depth = 0) { // depth-first search
	if (!root) {
		return;
	}
	if (!elements[depth]) {
		elements[depth] = [];
	}
	elements[depth].push(root.value);

	traverse(root.left, depth + 1); // forgot to pass the incremented level down
    traverse(root.right, depth + 1);
}

function traverse2(root, depth = 0) {
	if (!root) {
		return;
	}

	if (!elements[depth]) {
		elements[depth] = [root.value, 1];
	} else {
		const [sum, count] = elements[depth];
		elements[depth] = [sum + root.value, count + 1];
	}

	traverse2(root.left, depth + 1);
	traverse2(root.right, depth + 1);
}

// I start coding without thinking the solution through first.

/*
     4
    / \
   7   9
  / \   \
 10  2   6
      \
       6
      /
     2
 */

function getAverages(root) {
	const result = [];
	const queue = [[root, 0]];
	let currentDepth = 0;
	let sum = 0;
	let count = 0;

	while (queue.length) {
		const [node, depth] = queue.shift();

		if (depth > currentDepth) {
			currentDepth = depth;
			result.push(sum / count);
			sum = 0;
			count = 0;
		}

		if (node) {
			queue.push([node.left, depth + 1]);
			queue.push([node.right, depth + 1]);

			count++;
			sum += node.value;
		}
	}

	return result;
}

const tree = {
	value: 4,
	left: {
		value: 7,
		left: {
			value: 10
		},
		right: {
			value: 2,
			right: {
				value: 6,
				left: {
					value: 2
				}
			}
		}
	},
	right: {
		value: 9,
		right: {
			value: 6
		}
	}
};

function getAvgValues(tree) {
	elements = {};
	traverse(tree);
	const averages = [];
	for (depth in elements) {
		const arr = elements[depth];
		averages.push(arr.reduce((p, c) => p + c, 0) / arr.length);
	}
	return averages;
}

function getAvgValues2(tree) {
	elements = {};
	traverse2(tree);
	const averages = [];
	for (depth in elements) {
		const [sum, count] = elements[depth];
		averages.push(sum / count);
	}
	return averages;
}

console.log(getAvgValues(tree));
console.log(getAvgValues2(tree));
console.log(getAverages(tree));

// Pre-order, post-order, and in-order traversals are all depth-first.
// Breadth-first requires a queue, typically.


// ---------------------------------------------------------------------

// My FB interview questions on Oct 21, 2021

// Given two DOM subtrees with roots at A and B, where subtree B is the clone of subtree A
// and x is some element somewhere in A, find the node y in B that corresponds to node x in A.

// My original idea was to DFS the A tree for x and build a path as I go.
// Then use that path on the second tree to find y.
// I asked if I can proceed to code it and immediately sensed something in his body language,
// so I was like is there a more efficient way to do it? :)

// The hint was that I can rely on the fact that this is a DOM tree.
// I asked if that means that I can rely on the parent link each node has.
// He said yes, but he doesn't want to give away more than that.
// And I kinda struggled to figure out how that would be useful.
// Then he asked well how would you find an element in the second tree, you said you would use DFS
// to presumably build a pass while you traverse A to later use it to find y in B. I was like "yeah".
// So what would that path look like? And I said, like a linked list and them immediately corrected to
// say, that it can just be a simple array of parents on our way down.
// And then he said, well the elements are not the exactly the same in a the cloned tree.
// They're same type but not the same elements. So I said in that case I can use indexes in the children
// array of each parent on the way down as the path. But I still couldn't see how the parent property
// would be helpful to avoid the need for DFS.
// And than he's like well you have access the parentNode property of x. And then it dawned on me
// that I can actually use the parentNode to go bottom up.
// So it's be like log(n) time complexity because it's dependant on the depth of the tree.
// Though I'd have to use use the indexOf to find the index of a child in each parent, so it wouldn't be
// exactly as cheap as log(n).
// Actually, since big O is the time complexity of the worst case scenario, and the worst case scenario
// is either all nodes being children of the root and one we're looking for is the last one in that
// array of children, or at every level of the tree we have exactly one node. In that case we get O(n)
// time complexity. Which means my answer was wrong.

function findElementInClone(A, B, x) { // return y

}

// The second question was, imagine a situation where you have a viewport in a SPA and any of the components
// that are in it might have scheduled timeouts via setTimeout. And now you're replacing the viewport's
// contents with other components, so you want to call the clearAllTimeouts function to make sure all
// the timeouts that might have been scheduled are cleared.
// So how would you implement that?