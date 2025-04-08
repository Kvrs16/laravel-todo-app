<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();
        return view('tasks.index', compact('tasks'));
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);
        $task = Task::create([
            'title' => $request->title,
            'completed' => false,
            'favorite' => false
        ]);

        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate(['title' => 'required|string|max:255']);
        $task->update(['title' => $request->title]);

        return response()->json(['message' => 'Task updated successfully']);
    }

    public function toggleComplete(Task $task)
    {
        $task->completed = !$task->completed;
        $task->save();

        return response()->json(['completed' => $task->completed]);
    }

    public function toggleFavorite(Task $task)
    {
        $task->favorite = !$task->favorite;
        $task->save();

        return response()->json(['favorite' => $task->favorite]);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
