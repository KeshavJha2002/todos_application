# Database Schema Documentation

## Overview

This document provides a comprehensive overview of the database schema designed for the todo application. The schema encompasses tables for user management, task tracking, task grouping, and task relationships.

## Tables

### `public.user`

- **Description**: Stores information about application users.
- **Columns**:
  - `user_id` (Primary Key): Unique identifier for each user.
  - `user_name`: The name of the user.
  - `user_email`: Email address of the user.
  - `user_password`: Encrypted password for user authentication.
  - `user_status`: Indicates the status of the user account (active/inactive).

### `public.tasks`

- **Description**: Stores details of tasks created by users.
- **Columns**:
  - `task_id` (Primary Key): Unique identifier for each task.
  - `task_title`: Title of the task.
  - `task_description`: Description of the task.
  - `task_created_at`: Date and time when the task was created.
  - `task_created_by_id` (Foreign Key): References the `user_id` of the user who created the task.
  - `task_deadline`: Deadline for completing the task.
  - `task_notification`: Indicates whether notifications are enabled for the task.
  - `task_status`: Indicates the status of the task (completed/incomplete).
  - `task_group_id` (Foreign Key): References the `task_group_id` if the task belongs to a group.
  - `task_have_subtasks`: Indicates whether the task has subtasks.

### `public.task_group`

- **Description**: Stores information about task groups.
- **Columns**:
  - `task_group_id` (Primary Key): Unique identifier for each task group.
  - `task_group_title`: Title of the task group.
  - `task_group_description`: Description of the task group.
  - `task_group_created_at`: Date and time when the task group was created.
  - `task_group_created_by_id` (Foreign Key): References the `user_id` of the user who created the task group.
  - `task_group_deadline`: Deadline for completing tasks within the group.
  - `task_group_notification`: Indicates whether notifications are enabled for the task group.
  - `task_group_status`: Indicates the status of the task group (active/inactive).

### `public.task_relationship`

- **Description**: Defines relationships between tasks, particularly for subtasks.
- **Columns**:
  - `from_task_id` (Composite Key): References the `task_id` of the master task.
  - `to_task_id` (Composite Key): References the `task_id` of the subtask.

## Indexes

<!-- TODO -->

## Constraints

<!-- TODO -->

## Conclusion

This database schema provides a solid foundation for managing tasks within the todo application. It is designed to ensure data integrity, scalability, and performance while meeting the requirements of the application's users.
