import React  from 'react';
import {useTasks} from '../../context/TaskContext';
import Task from '../comprised/Task';

const TaskList: React.FC = () => {
    const { filteredTasks } = useTasks();

    return (
        <div>
            {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={() => {}}
                    />
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );

};

export default TaskList;
